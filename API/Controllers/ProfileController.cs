
using Application.Core;
using Application.Profiles;
using Application.Profiles.DTOS;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfileController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<PagedList<Application.Profiles.DTOS.Profile>>> GetProfiles([FromQuery] ProfileParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = param }));
        }
        
        [HttpGet("{Username}")]
        public async Task<ActionResult<PagedList<Application.Profiles.DTOS.Profile>>> GetProfile([FromRoute] string Username)
        {
            return HandleResult(await Mediator.Send(new Application.Profiles.Profile.Command { Username = Username }));
        }

    }
}