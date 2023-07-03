

using Application.ComSciSubject.DTOS;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions; 
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ComSciSubject
{
    public class List
    {
        public class Query : IRequest<Result<List<ComSciSubjectPreview>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<ComSciSubjectPreview>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<List<ComSciSubjectPreview>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var list = await context.ComputerScienceSubjects
                    .Include(a => a.Photos)
                    .OrderByDescending(a => a.CreatedAt)
                    .ProjectTo<ComSciSubjectPreview>(mapper.ConfigurationProvider).ToListAsync();

                return Result<List<ComSciSubjectPreview>>.Success(list);
            }
        }
    }
}