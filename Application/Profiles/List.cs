
using Application.Core;
using Application.Profiles.DTOS;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.DTOS;
using MediatR;
using Microsoft.EntityFrameworkCore;
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

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<PagedList<DTOS.Profile>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = context.Users
                    .OrderBy(a => a.CreatedAt) 
                    .Where(a => a.IsUsed)
                    .ProjectTo<DTOS.Profile>(mapper.ConfigurationProvider)
                    .AsQueryable();

                query = request.Params.Role.ToLower() switch
                {
                    "student" => query.Where(a => a.IsRole == UserRole.Student),
                    "lecturer" => query.Where(a => a.IsRole == UserRole.Lecturer),
                    "guest" => query.Where(a => a.IsRole == UserRole.Guest),
                    _ => query.Where(a => a.IsRole != UserRole.Admin),
                };

                if (!request.Params.Search.IsNullOrEmpty())
                {
                    var wordSearch = request.Params.Search.ToString().ToLower();
                    query = query.Where(a =>
                        a.FullName.ToLower().Contains(wordSearch) ||
                        a.Email.ToLower().Contains(wordSearch) ||
                        a.Student.YearEdu.ToString().ToLower().Contains(wordSearch) ||
                        a.Lecturer.Position.ToLower().Contains(wordSearch)
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