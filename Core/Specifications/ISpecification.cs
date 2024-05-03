using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public interface ISpecification<T> where T : BaseEntity
    {
        // Filter
        Expression<Func<T, bool>> Criteria { get; set; }
        string Search { get; set; }
        // Include attributes
        List<Expression<Func<T, object>>> Includes { get; }
        // Ordering
        Expression<Func<T, object>> OrderBy { get; set; }
        List<Expression<Func<T, object>>> ThenBys { get; }
        Expression<Func<T, object>> OrderByDescending { get; set; }
        List<Expression<Func<T, object>>> ThenByDescendings { get; }
        // Paging
        bool IsPagingEnabled { get; set; }
        int Skip { get; set; }
        int Take { get; set; }

        
        // Filter
        void AddInclude(Expression<Func<T, object>> includeExpression);
        // Include attributes
        void AddIncludes(IReadOnlyCollection<Expression<Func<T, object>>> includeExpressions);
        // Ordering
        void AddThenBy(Expression<Func<T, object>> thenByExpression);
        void AddThenBys(IReadOnlyCollection<Expression<Func<T, object>>> thenByExpressions);
        void AddThenByDescending(Expression<Func<T, object>> thenByDescendingExpression);
        void AddThenByDescendings(IReadOnlyCollection<Expression<Func<T, object>>> thenByDescendingExpressions);
        // Paging
        void ApplyPaging(int pageIndex, int pageSize);
    }
}