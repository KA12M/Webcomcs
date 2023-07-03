
using Application.interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    public class UploadFileController : BaseApiController
    {
        private readonly IUploadFileAccessor uploadFileAccessor;

        public UploadFileController(IUploadFileAccessor uploadFileAccessor)
        {
            this.uploadFileAccessor = uploadFileAccessor;
        }

        [HttpPost("image")]
        public async Task<ActionResult> UploadImageAsync([FromForm] IFormFileCollection file, [FromQuery] int quality = 70, [FromQuery] bool saveOriginalFile = false)
        {
            (string errorMessage, string imageName) = await uploadFileAccessor.UpLoadImageOneAsync(file, quality, saveOriginalFile);
            if (!errorMessage.IsNullOrEmpty()) return BadRequest(errorMessage);
            return Ok(imageName);
        }

        [HttpPost("file")]
        public async Task<ActionResult> UploadImagesAsync([FromForm] IFormFileCollection file)
        {
            string imageName = await uploadFileAccessor.UpLoadFileOneAsync(file);
            return Ok(imageName);
        }
    }
}