
using Application.CourseComment;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator mediator;

        public ChatHub(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task SendComment(Create.Command command)
        {
            var comment = await mediator.Send(command);

            await Clients.Group(command.GenerationId.ToString())
                .SendAsync("ReceiveComment", comment.Value);
        }

        public async Task RemoveComment(Remove.Command command)
        {
            var comment = await mediator.Send(command);

            await Clients.Group(command.GenerationId.ToString())
                .SendAsync("SendRemoveComment", comment.Value);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var generationId = httpContext.Request.Query["generationId"];

            await Groups.AddToGroupAsync(Context.ConnectionId, generationId);
            var result = await mediator.Send(new List.Query { GenerationId = generationId.ToString() });
            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }
    }
}