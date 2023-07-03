
using Application.interfaces;

namespace Infrastructure.utils
{
    public class GenerationAccessor : IGenerationAccessor
    {
        public string GenerateId(string prefix)
        {
            var randomChars = Guid.NewGuid().ToString().Substring(0, 8).ToUpper();

            var datePart = DateTime.Now.ToString("yyMMdd");

            return $"{prefix}{randomChars}{datePart}";
        }
    }
}