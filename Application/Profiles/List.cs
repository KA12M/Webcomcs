
using Application.Core;
using Application.interfaces;
using Application.Profiles.DTOS;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.DTOS;
using MediatR;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace Application.Profiles
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<DTOS.Profile>>>
        {
            public ProfileParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<DTOS.Profile>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                this.context = context;
                this.mapper = mapper;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<PagedList<DTOS.Profile>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = context.Users
                    .OrderByDescending(a => a.CreatedAt)
                    .Where(a => a.IsUsed)
                    .ProjectTo<DTOS.Profile>(mapper.ConfigurationProvider, new { Username = userAccessor.GetUsername() })
                    .AsQueryable();

                if (!request.Params.Role.IsNullOrEmpty()) query = query.Where(a => a.IsRole == ((UserRole)int.Parse(request.Params.Role)));

                if (!request.Params.Search.IsNullOrEmpty())
                {
                    var wordSearch = request.Params.Search;
                    query = query.Where(a =>
                        a.FullName.Contains(wordSearch) ||
                        a.Email.Contains(wordSearch) ||
                        a.Student.YearEdu.Contains(wordSearch) ||
                        a.Lecturer.Position.Contains(wordSearch)
                    );
                }

                return Result<PagedList<DTOS.Profile>>.Success(
                    await PagedList<DTOS.Profile>.CreateAsync(
                        query,
                        request.Params.currentPage,
                        request.Params.PageSize
                    ));
            }
        }

    }
}