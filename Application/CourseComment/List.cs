
using Application.Core;
using Application.CourseComment.DTOS;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.CourseComment
{
    public class List
    {
        public class Query : IRequest<Result<List<CourseCommentDTO>>>
        {
            public string GenerationId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<CourseCommentDTO>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<List<CourseCommentDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var comments = await context.CourseComments
                    .Include(a => a.Generation)
                    .Include(a => a.Author)
                    .Where(a => a.Generation.Id == request.GenerationId)
                    .OrderByDescending(a => a.CreatedAt)
                    .ProjectTo<CourseCommentDTO>(mapper.ConfigurationProvider).ToListAsync();

                return Result<List<CourseCommentDTO>>.Success(comments);
            }
        }
    }
}