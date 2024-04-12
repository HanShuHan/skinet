using System.Linq.Expressions;
using Core.Entities;

namespace Core.Interfaces
{
    public interface ISpecification<T> where T : BaseEntity
    {
        Expression<Func<T, bool>> Criteria { get; set;}
        List<Expression<Func<T, object>>> Includes { get; }
    }
}