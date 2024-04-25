using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public interface ISpecification<T> where T : BaseEntity
    {
        Expression<Func<T, bool>> Criteria { get; set; }
        string Search { get; set; }
        Expression<Func<T, object>> OrderBy { get; set;}
        List<Expression<Func<T, object>>> ThenBys { get;}
        Expression<Func<T, object>> OrderByDescending { get; set;}
        List<Expression<Func<T, object>>> ThenByDescendings { get;}
        List<Expression<Func<T, object>>> Includes { get; }
        bool IsPagingEnabled { get; set; }
        int Skip { get; set; }
        int Take { get; set; }
    }
}