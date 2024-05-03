using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class BaseSpecification<T> : ISpecification<T> where T : BaseEntity
    {
        public Expression<Func<T, bool>> Criteria { get; set; }
        public string Search { get; set; }

        public List<Expression<Func<T, object>>> Includes { get; } = [];

        public Expression<Func<T, object>> OrderBy { get; set; }
        public List<Expression<Func<T, object>>> ThenBys { get; } = [];
        public Expression<Func<T, object>> OrderByDescending { get; set; }
        public List<Expression<Func<T, object>>> ThenByDescendings { get; } = [];

        public bool IsPagingEnabled { get; set; }
        public int Skip { get; set; }
        public int Take { get; set; }

        public BaseSpecification()
        {
        }

        public BaseSpecification(Expression<Func<T, bool>> criteria)
        {
            Criteria = criteria;
        }

        public void AddInclude(Expression<Func<T, object>> includeExpression)
        {
            Includes.Add(includeExpression);
        }

        public void AddIncludes(IReadOnlyCollection<Expression<Func<T, object>>> includeExpressions)
        {
            Includes.AddRange(includeExpressions);
        }

        public void AddThenBy(Expression<Func<T, object>> thenByExpression)
        {
            ThenBys.Add(thenByExpression);
        }

        public void AddThenBys(IReadOnlyCollection<Expression<Func<T, object>>> thenByExpressions)
        {
            ThenBys.AddRange(thenByExpressions);
        }

        public void AddThenByDescending(Expression<Func<T, object>> thenByDescendingExpression)
        {
            ThenByDescendings.Add(thenByDescendingExpression);
        }

        public void AddThenByDescendings(IReadOnlyCollection<Expression<Func<T, object>>> thenByDescendingExpressions)
        {
            ThenByDescendings.AddRange(thenByDescendingExpressions);
        }

        public void ApplyPaging(int pageIndex, int pageSize)
        {
            IsPagingEnabled = true;
            Skip = pageSize * (pageIndex - 1);
            Take = pageSize;
        }
    }
}