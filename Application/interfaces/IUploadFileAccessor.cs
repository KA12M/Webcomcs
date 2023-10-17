
using Microsoft.AspNetCore.Http;

namespace Application.interfaces
{
    public interface IUploadFileAccessor
    {
        bool IsUpload(IFormFileCollection formFiles);
        string Validation(IFormFileCollection formFiles);
        Task Delete(string filename, string type = "image");

        Task<(string errorMessage, string imageName)> UpLoadImageOneAsync(IFormFileCollection formFiles, int quality = 70, bool saveOriginalFile = false);
        Task<(string errorMessage, List<string> imageName)> UpLoadImagesAsync(IFormFileCollection formFiles, int quality = 70, bool saveOriginalFile = false);
        Task<string> UpLoadFileOneAsync(IFormFileCollection formFiles, string nameFile = "");
    }
}