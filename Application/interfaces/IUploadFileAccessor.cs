
using Microsoft.AspNetCore.Http;

namespace Application.interfaces
{
    public interface IUploadFileAccessor
    {
        bool IsUpload(IFormFileCollection formFiles);
        string Validation(IFormFileCollection formFiles); 
        Task Delete(string filename, string type = "image");

        Task<(string errorMessage, string imageName)> UpLoadImageOne(IFormFileCollection formFiles);
        Task<(string errorMessage, List<string> imageName)> UpLoadImages(IFormFileCollection formFiles);
        Task<string> UpLoadFileOne(IFormFileCollection formFiles);
    }
}