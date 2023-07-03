
using Application.Accounts;
using Application.Core;
using Application.interfaces;
using Application.News;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.security;
using Infrastructure.utils;
using MediatR;

namespace API.Installers
{
    public class ApplicationInstaller : IInstallers
    {

        public void InstallServices(WebApplicationBuilder builder)
        {
            builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            builder.Services.AddMediatR(typeof(UpdateMe.Handler).Assembly);

            builder.Services.AddFluentValidationAutoValidation();
            builder.Services.AddValidatorsFromAssemblyContaining<Add>();

            builder.Services.AddScoped<IUserAccessor, UserAccessor>();
            builder.Services.AddScoped<IGenerationAccessor, GenerationAccessor>();
            builder.Services.AddScoped<IUploadFileAccessor, UploadFileAccessor>();

            builder.Services.AddSignalR();
        }
    }
}