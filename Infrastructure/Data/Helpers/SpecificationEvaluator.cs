using Core.Entities;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Helpers
{
    public static class SpecificationEvaluator<T> where T : BaseEntity
    {
        public static IQueryable<T> GetQuery(IQueryable<T> inputQuery, ISpecification<T> specification)
        {
            var query = inputQuery;

            if (specification.Criteria != null)
            {
                query = query.Where(specification.Criteria);
            }
            
            if (specification.Includes.Any())
            {
                query = specification.Includes.Aggregate(query, (current, include) => current.Include(include));
            }

            if (specification.OrderBy != null)
            {
                query = query.OrderBy(specification.OrderBy);
            }

            if (specification.OrderByDescending != null)
            {
                query = query.OrderByDescending(specification.OrderByDescending);
            }

            if (specification.ThenBys.Any())
            {
                var orderedQuery = (IOrderedQueryable<T>) query;

                query = specification.ThenBys.Aggregate(orderedQuery, (current, thenBy) => current.ThenBy(thenBy));
            }
            
            if (specification.ThenByDescendings.Any())
            {
                var orderedQuery = (IOrderedQueryable<T>) query;

                query = specification.ThenByDescendings.Aggregate(orderedQuery, (current, thenByDescending) => current.ThenByDescending(thenByDescending));
            }

            if (specification.IsPagingEnabled)
            {
                query = query.Skip(specification.Skip).Take(specification.Take);
            }

            return query;
        }
    }
}