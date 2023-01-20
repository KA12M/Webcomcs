
using Application.Core;
using Application.HomePhotos.DTOS;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.HomePhotos
{
    public class Detail
    {
        public class Query : IRequest<Result<HomePhotoDTO>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<HomePhotoDTO>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<HomePhotoDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var photo = await context.HomePhotos.FirstOrDefaultAsync(a => a.Id == request.Id);
                if (photo == null) return null;

                return Result<HomePhotoDTO>.Success(mapper.Map<HomePhotoDTO>(photo));
            }
        }
    }
}