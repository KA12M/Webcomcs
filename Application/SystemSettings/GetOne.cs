 
using Application.Core;
using Application.SystemSettings.DTOS;
using AutoMapper;
using Domain.Others;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.SystemSettings
{
    public class GetOne
    {
        public class Query : IRequest<Result<SystemSettingDTO>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<SystemSettingDTO>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<SystemSettingDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = await context.SystemSettings.FirstOrDefaultAsync();
                if (query == null) return null;
                
                return Result<SystemSettingDTO>.Success(mapper.Map<SystemSetting, SystemSettingDTO>(query));
            }
        }
    }
}