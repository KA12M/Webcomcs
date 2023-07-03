
using Application.Core;

namespace Application.JobHistory.DTOS
{
    public class JobHistoryParams : PagingParams
    {
        public bool ShowAll { get; set; } = false;
    }
}