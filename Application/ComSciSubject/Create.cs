
using Application.ComSciSubject.DTOS;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.ComSciSubject
{
    public class Create
    {
        public class Command : IRequest<Result<ComputerScienceSubject>>
        {
            public ComSciSubjectCreate ComSciSubject { get; set; }
        }

        public class CommandValidator : AbstractValidator<ComSciSubjectCreate>
        {
            public CommandValidator()
            {
                RuleFor(a => a.Icon).NotEmpty();
                RuleFor(a => a.SubjectName).NotEmpty();
                RuleFor(a => a.SubTitle).NotEmpty();
                RuleFor(a => a.Description).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<ComputerScienceSubject>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<ComputerScienceSubject>> Handle(Command request, CancellationToken cancellationToken)
            {
                var newComSciSubject = mapper.Map<ComputerScienceSubject>(request.ComSciSubject);

                context.ComputerScienceSubjects.Add(newComSciSubject);

                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<ComputerScienceSubject>.Success(newComSciSubject) : Result<ComputerScienceSubject>.Failure("Problem new subject.");
            }
        }
    }
}