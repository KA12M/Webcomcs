
using System.Text.RegularExpressions;
using Application.interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SixLabors.ImageSharp.Formats.Jpeg;

namespace Infrastructure.utils
{
    public class UploadParams
    {
        public IFormFileCollection formFiles { get; set; }
        public string type { get; set; } = "image";
        public int quality { get; set; } = 70;
        public bool saveOriginalFile { get; set; } = false;
        public string nameFile { get; set; } = "";
    }

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

        private async Task<List<string>> UploadAsync(UploadParams param)
        {
            var listFileName = new List<string>();
            var uploadPath = $"{webHostEnvironment.WebRootPath}/{param.type}-upload/";
            if (!Directory.Exists(uploadPath)) Directory.CreateDirectory(uploadPath);
            foreach (var formFile in param.formFiles)
            {
                string fileName = !param.nameFile.IsNullOrEmpty() ? Regex.Replace(param.nameFile, @"\s", "-") + Path.GetExtension(formFile.FileName) : Guid.NewGuid().ToString("N") + Path.GetExtension(formFile.FileName);
                string fullName = uploadPath + fileName;

                if (param.type == "file" || param.saveOriginalFile) using (var stream = File.Create(fullName)) await formFile.CopyToAsync(stream);
                else using (var image = Image.Load(formFile.OpenReadStream()))
                    {
                        var encoder = new JpegEncoder { Quality = param.quality };
                        image.Save(fullName, encoder);
                    }
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

        public bool ValidationSize(long fileSize) => int.Parse(configuration["Upload:FileSizeLimit"]) > fileSize;

        public async Task<(string errorMessage, string imageName)> UpLoadImageOneAsync(IFormFileCollection formFiles, int quality = 70, bool saveOriginalFile = false)
        {
            string errorMessage = string.Empty;
            string imageName = string.Empty;
            if (IsUpload(formFiles))
            {
                errorMessage = Validation(formFiles);
                if (string.IsNullOrEmpty(errorMessage))
                    imageName = (await UploadAsync(new UploadParams
                    {
                        formFiles = formFiles,
                        type = "image",
                        quality = quality,
                        saveOriginalFile = saveOriginalFile
                    }))[0];
            }
            return (errorMessage, imageName);
        }

        public async Task<(string errorMessage, List<string> imageName)> UpLoadImagesAsync(IFormFileCollection formFiles, int quality = 70, bool saveOriginalFile = false)
        {
            string errorMessage = string.Empty;
            List<string> imageName = new List<string>();
            if (IsUpload(formFiles))
            {
                errorMessage = Validation(formFiles);
                if (string.IsNullOrEmpty(errorMessage))
                    imageName = await UploadAsync(new UploadParams
                    {
                        formFiles = formFiles,
                        type = "image",
                        quality = quality,
                        saveOriginalFile = saveOriginalFile
                    });
            }
            return (errorMessage, imageName);
        }

        public async Task<string> UpLoadFileOneAsync(IFormFileCollection formFiles, string nameFile = "")
        {
            string imageName = string.Empty;

            if (IsUpload(formFiles))
            {
                imageName = (await UploadAsync(new UploadParams
                {
                    formFiles = formFiles,
                    type = "file",
                    nameFile = nameFile
                }))[0];
            }
            return imageName;
        }
    }
}