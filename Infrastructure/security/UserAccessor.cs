
using System.Security.Claims;
using Application.interfaces;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.security
{
    public class UserAccessor : IUserAccessor
    { 
        private readonly IHttpContextAccessor httpContextAccessor;

        public UserAccessor(DataContext context, IHttpContextAccessor httpContextAccessor)
        { 
            this.httpContextAccessor = httpContextAccessor;
        }

        public string GetUsername()
        {
            var context = httpContextAccessor.HttpContext;
            return context.User.FindFirstValue(ClaimTypes.Name);
        }
    }
}