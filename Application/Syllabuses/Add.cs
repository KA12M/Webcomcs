using Application.Core;
using Application.Syllabuses.DTOS;
using AutoMapper;
using Domain.Others;
using MediatR;
using Persistence;

namespace Application.Syllabuses
{
    public class Add
    {
        public class Command : IRequest<Result<Unit>>
        {
            public SyllabusCreate Syllabus { get; set; }
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
                var newSyllabus = mapper.Map<Syllabus>(request.Syllabus);

                context.Syllabuses.Add(newSyllabus);

                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem to add data.");
            }
        }
    }
}