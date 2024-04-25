using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class BaseSpecification<T> : ISpecification<T> where T : BaseEntity
    {
        public Expression<Func<T, bool>> Criteria { get; set; }
        public string Search { get; set; }
        public Expression<Func<T, object>> OrderBy { get; set; }
        public List<Expression<Func<T, object>>> ThenBys { get; } = new List<Expression<Func<T, object>>>();
        public Expression<Func<T, object>> OrderByDescending { get; set; }
        public List<Expression<Func<T, object>>> ThenByDescendings { get; } = new List<Expression<Func<T, object>>>();
        public List<Expression<Func<T, object>>> Includes { get; } = new List<Expression<Func<T, object>>>();
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

        protected void AddInclude(Expression<Func<T, object>> includeExpression)
        {
            Includes.Add(includeExpression);
        }

        protected void AddIncludes(IReadOnlyCollection<Expression<Func<T, object>>> includeExpressions)
        {
            Includes.AddRange(includeExpressions);
        }

        protected void AddThenBy(Expression<Func<T, object>> thenByExpression)
        {
            ThenBys.Add(thenByExpression);
        }

        protected void AddThenBys(IReadOnlyCollection<Expression<Func<T, object>>> thenByExpressions)
        {
            ThenBys.AddRange(thenByExpressions);
        }

        protected void AddThenByDescsending(Expression<Func<T, object>> thenByDescendingExpression)
        {
            ThenByDescendings.Add(thenByDescendingExpression);
        }

        protected void AddThenByDescsendings(IReadOnlyCollection<Expression<Func<T, object>>> thenByDescendingExpressions)
        {
            ThenByDescendings.AddRange(thenByDescendingExpressions);
        }

        protected void ApplyPaging(int pageIndex, int pageSize)
        {
            if (pageIndex < 1)
            {
                pageIndex = 1;
            }

            if (pageSize > ProductSpecParams.MaxPageSize || pageSize < 1)
            {
                pageSize = ProductSpecParams.MaxPageSize;
            }

            IsPagingEnabled = true;
            Skip = pageSize * (pageIndex - 1);
            Take = pageSize;
        }
    }
}