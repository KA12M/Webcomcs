using Application.Core;
using Application.interfaces;
using Application.Syllabuses.DTOS;
using AutoMapper;
using Domain.Others;
using FluentValidation;
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

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Syllabus.NameTH).NotEmpty();
                RuleFor(x => x.Syllabus.NameEN).NotEmpty();
                RuleFor(x => x.Syllabus.DegreeTH).NotEmpty();
                RuleFor(x => x.Syllabus.DegreeEN).NotEmpty();
                RuleFor(x => x.Syllabus.Year).NotEmpty().Must(a => a.Count() == 4);
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IUploadFileAccessor uploadFileAccessor;
            private readonly IGenerationAccessor generationAccessor;

            public Handler(DataContext context, IMapper mapper, IUploadFileAccessor uploadFileAccessor, IGenerationAccessor generationAccessor)
            {
                this.context = context;
                this.mapper = mapper;
                this.uploadFileAccessor = uploadFileAccessor;
                this.generationAccessor = generationAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var newSyllabus = mapper.Map<Syllabus>(request.Syllabus);

                newSyllabus.Id = generationAccessor.GenerateId("SYLLABUS");

                context.Syllabuses.Add(newSyllabus);

                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem to add data.");
            }
        }
    }
}