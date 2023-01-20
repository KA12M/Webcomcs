

using System.Linq;
using Application.Core;
using Application.interfaces;
using Application.News.DTOS;
using AutoMapper;
using Domain.Others;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace Application.News
{
    public class Add
    {
        public class Command : IRequest<Result<Unit>>
        {
            public NewsCreate News { get; set; }
        }

        public class CommandValidator : AbstractValidator<NewsCreate>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).MaximumLength(150).NotEmpty();
                RuleFor(x => x.SubTitle).MaximumLength(300);
                RuleFor(x => x.Body).NotEmpty(); 
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IUploadFileAccessor uploadFileAccessor;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IMapper mapper, IUploadFileAccessor uploadFileAccessor, IUserAccessor userAccessor)
            {
                this.context = context;
                this.mapper = mapper;
                this.uploadFileAccessor = uploadFileAccessor;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users.FirstOrDefaultAsync(a => a.UserName == userAccessor.GetUsername());

                (string errorMessage, List<string> imageNameList) = await uploadFileAccessor.UpLoadImages(request.News.FileImages);
                if (!errorMessage.IsNullOrEmpty()) return Result<Unit>.Failure(errorMessage);

                var newNews = mapper.Map<Domain.Others.News>(request.News);

                foreach (var img in imageNameList) newNews.NewsPhotos.Add(new NewsPhoto { Url = img });
                newNews.NewsPhotos.FirstOrDefault().IsMain = true;

                newNews.Author = user;

                context.Newses.Add(newNews);
                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem to add data.");
            }
        }
    }
}