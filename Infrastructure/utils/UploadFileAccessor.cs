
using Application.interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.utils
{
    public class UploadFileAccessor : IUploadFileAccessor
    {
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IConfiguration configuration;

        public UploadFileAccessor(IWebHostEnvironment webHostEnvironment, IConfiguration configuration)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.configuration = configuration;
        }

        public Task Delete(string filename, string type)
        {
            if (!string.IsNullOrEmpty(filename))
            {
                var Path = $"{webHostEnvironment.WebRootPath}/{type}-upload/";
                string fullName = Path + filename;
                if (File.Exists(fullName)) File.Delete(fullName);
            }
            return Task.CompletedTask;
        }

        public bool IsUpload(IFormFileCollection formFiles) => formFiles == null ? false : formFiles.Count > 0;

        private async Task<List<string>> Upload(IFormFileCollection formFiles, string type = "image")
        {
            var listFileName = new List<string>();
            var uploadPath = $"{webHostEnvironment.WebRootPath}/{type}-upload/";
            if (!Directory.Exists(uploadPath)) Directory.CreateDirectory(uploadPath);
            foreach (var formFile in formFiles)
            {
                string fileName = Guid.NewGuid().ToString("N") + Path.GetExtension(formFile.FileName);
                string fullName = uploadPath + fileName;

                using (var stream = File.Create(fullName)) await formFile.CopyToAsync(stream);
                listFileName.Add(fileName);
            }
            return listFileName;
        }

        public string Validation(IFormFileCollection formFiles)
        {
            foreach (var file in formFiles)
            {
                if (!ValidationExtension(file.FileName)) return "Invalid file  " + String.Join(", ", "Constants.TypeImageForUploads");

                if (!ValidationSize(file.Length)) return "The file is too large " + (double)(int.Parse(configuration["Upload:FileSizeLimit"])) / 1024 / 1024 + "M";
            }
            return null!;
        }

        public bool ValidationExtension(string filename)
        {
            string[] permittedExtensions = { ".jpg", ".png", ".jpeg", ".JPEG", ".jfif" };
            string extension = Path.GetExtension(filename).ToLowerInvariant();

            if (string.IsNullOrEmpty(extension) || !permittedExtensions.Contains(extension)) return false;
            return true;
        }

        public bool ValidationSize(long fileSize) => (int.Parse(configuration["Upload:FileSizeLimit"])) > fileSize;

        public async Task<(string errorMessage, string imageName)> UpLoadImageOne(IFormFileCollection formFiles)
        {
            string errorMessage = string.Empty;
            string imageName = string.Empty;
            if (IsUpload(formFiles))
            {
                errorMessage = Validation(formFiles);
                if (string.IsNullOrEmpty(errorMessage))
                    imageName = (await Upload(formFiles))[0];
            }
            return (errorMessage, imageName);
        }

        public async Task<(string errorMessage, List<string> imageName)> UpLoadImages(IFormFileCollection formFiles)
        {
            string errorMessage = string.Empty;
            List<string> imageName = new List<string>();
            if (IsUpload(formFiles))
            {
                errorMessage = Validation(formFiles);
                if (string.IsNullOrEmpty(errorMessage))
                    imageName = (await Upload(formFiles));
            }
            return (errorMessage, imageName);
        }

        public async Task<string> UpLoadFileOne(IFormFileCollection formFiles)
        {
            string imageName = string.Empty;
            if (IsUpload(formFiles))
            {
                imageName = (await Upload(formFiles, "file"))[0];
            }
            return imageName;
        }
    }
}