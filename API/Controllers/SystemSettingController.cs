using Application.SystemSettings;
using Application.SystemSettings.DTOS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SystemSettingController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult> GetSystemSetting()
        {
            return HandleResult(await Mediator.Send(new GetOne.Query()));
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdateSetting([FromForm] SystemSettingUpdate setting)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Setting = setting }));
        }
    }
}