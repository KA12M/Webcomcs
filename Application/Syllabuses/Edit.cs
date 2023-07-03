
using System.Xml.Linq;
using Application.Core;
using Application.Syllabuses.DTOS;
using AutoMapper;
using Domain.Others;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Syllabuses
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public SyllabusUpdate Syllabus { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var syllabus = await context.Syllabuses
                    .Include(a => a.Subjects)
                    .Include(a => a.Objectives)
                    .Include(a => a.Occupations)
                    .FirstOrDefaultAsync(a => a.Id == request.Syllabus.Id);
                if (syllabus == null) return null; 

                context.Subjects.RemoveRange(syllabus.Subjects);
                context.Objectives.RemoveRange(syllabus.Objectives);
                context.Occupations.RemoveRange(syllabus.Occupations);
                mapper.Map(request.Syllabus, syllabus);
                context.Entry(syllabus).State = EntityState.Modified; 

                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem to add data.");
            }
        }
    }
}