
using System.Security.Claims;
using System.Text.RegularExpressions;
using API.DTOS;
using API.services;
using Application.Accounts;
using Application.Accounts.DTOS;
using Application.interfaces;
using Domain;
using Domain.DTOS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Extensions;
using Persistence;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext context;
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly IConfiguration config;
        private readonly TokenService tokenService;
        private readonly IUserAccessor userAccessor;
        private readonly IGenerationAccessor generationAccessor;

        public AccountController(DataContext context, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IConfiguration config, TokenService tokenService, IUserAccessor userAccessor, IGenerationAccessor generationAccessor)
        {
            this.context = context;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.config = config;
            this.tokenService = tokenService;
            this.userAccessor = userAccessor;
            this.generationAccessor = generationAccessor;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var user = await userManager.Users
                .FirstOrDefaultAsync(a => a.Email == User.FindFirstValue(ClaimTypes.Email));

            return await CreateObjectUser(user);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login([FromBody] LoginDTO data)
        {
            var user = await userManager.Users
                .FirstOrDefaultAsync(a => a.Email == data.Email || a.UserName == data.Email && a.IsUsed);
            if (user == null) return Unauthorized("ชื่อผู้ใช้ อีเมล หรือ รหัสผ่านไม่ถูกต้อง");

            var result = await signInManager.CheckPasswordSignInAsync(user, data.Password, false);

            if (result.Succeeded)
            {
                return await CreateObjectUser(user);
            }

            return Unauthorized("ชื่อผู้ใช้ อีเมล หรือ รหัสผ่านไม่ถูกต้อง");
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register([FromBody] RegisterDTO data)
        {
            if (data.Role == UserRole.Admin) return BadRequest("Problem registering user!");

            var isEmail = await userManager.Users.AnyAsync(a => a.Email == data.Email);
            var isUsername = await userManager.Users.AnyAsync(a => a.UserName == data.Username);
            if (isEmail || isUsername)
            {
                if (isEmail) ModelState.AddModelError("email", "อีเมลไม่ถูกต้อง");
                if (isUsername) ModelState.AddModelError("username", "เกิดข้อผิดพลาด");
                return ValidationProblem();
            }

            if (data.Role == UserRole.Student)
            {
                Regex r = new Regex("[0-9]");
                if (String.IsNullOrEmpty(data.Username) || !r.IsMatch(data.Username) || data.Username.Length != 11)
                {
                    ModelState.AddModelError("username", "รหัสนักศึกษาไม่ถูกต้อง");
                    return ValidationProblem();
                }
            }
                
            var newUser = new AppUser
            {
                FullName = data.FullName,
                Email = data.Email,
                UserName = data.Role == UserRole.Student ? data.Username : generationAccessor.GenerateId("USER"),
                IsRole = data.Role
            };

            var result = await userManager.CreateAsync(newUser, data.Password);
            await userManager.AddToRoleAsync(newUser, data.Role.GetDisplayName());

            if (!result.Succeeded) return BadRequest("Problem registering user");
            return await CreateObjectUser(newUser);
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdateMe([FromForm] UpdateMe.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [Authorize]
        [HttpPut("hidden")]
        public async Task<ActionResult> UpdateHidden()
        {
            return HandleResult(await Mediator.Send(new UpdateHidden.Command()));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("setAdmin/{username}")]
        public async Task<ActionResult> SetAdmin(string username)
        {
            return HandleResult(await Mediator.Send(new SetAdmin.Command { Username = username }));
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("editUser")]
        public async Task<ActionResult> EditUser([FromBody] FormEditUser user)
        {
            return HandleResult(await Mediator.Send(new EditUser.Command { User = user }));
        }

        [Authorize]
        [HttpPost("resetPassword")]
        public async Task<ActionResult> ResetPassword(ResetPassword.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        private async Task<UserDTO> CreateObjectUser(AppUser user) => new UserDTO
        {
            Token = await tokenService.CreateToken(user),
            Username = user.UserName,
            FullName = user.FullName,
            Image = user.Image,
        };
    }
}