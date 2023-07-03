

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
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public NewsUpdate News { get; set; }
        }

        public class CommandValidator : AbstractValidator<NewsUpdate>
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

            public Handler(DataContext context, IMapper mapper, IUploadFileAccessor uploadFileAccessor)
            {
                this.context = context;
                this.mapper = mapper;
                this.uploadFileAccessor = uploadFileAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var news = await context.Newses 
                    .FirstOrDefaultAsync(a => a.Id == request.News.Id);
                if (news == null) return null;

                (string errorMessage, List<string> imageNameList) = await uploadFileAccessor.UpLoadImagesAsync(request.News.FileImages);
                if (!errorMessage.IsNullOrEmpty()) return Result<Unit>.Failure(errorMessage);
 
                mapper.Map<NewsUpdate, Domain.Others.News>(request.News, news);

                if (imageNameList.Count > 0)
                {
                    foreach (var img in imageNameList) news.NewsPhotos.Add(new NewsPhoto { Url = img });
                    var mainPhoto = news.NewsPhotos.FirstOrDefault(a => a.IsMain);
                    if (mainPhoto == null) news.NewsPhotos.FirstOrDefault().IsMain = true;
                }

                context.Entry(news).State = EntityState.Modified;

                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem to update data.");
            }
        }
    }
}