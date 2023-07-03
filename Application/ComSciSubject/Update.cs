
using Application.ComSciSubject.DTOS;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ComSciSubject
{
    public class Update
    {
        public class Command : IRequest<Result<ComputerScienceSubject>>
        {
            public ComSciSubjectUpdate ComSciSubject { get; set; }
        }

        public class CommandValidator : AbstractValidator<ComSciSubjectUpdate>
        {
            public CommandValidator()
            {
                RuleFor(a => a.Id).NotEmpty();
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
                var current = await context.ComputerScienceSubjects
                    .Include(a => a.Photos)
                    .FirstOrDefaultAsync(a => a.Id == request.ComSciSubject.Id);
                if (current == null) return null;

                context.ComputerScienceImages.RemoveRange(current.Photos);

                mapper.Map<ComSciSubjectUpdate, ComputerScienceSubject>(request.ComSciSubject, current); 

                var success = await context.SaveChangesAsync() > 0;
                return success ? Result<ComputerScienceSubject>.Success(current) : Result<ComputerScienceSubject>.Failure("Problem update subject.");
            }
        }
    }
}