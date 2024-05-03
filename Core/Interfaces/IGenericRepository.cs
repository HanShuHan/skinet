using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<int> CountAsync(ISpecification<T> specification);

        Task<IReadOnlyList<T>> ListAllAsync();

        Task<IReadOnlyList<T>> ListWithSpecsAsync(ISpecification<T> specification);

        Task<T> GetByIdAsync(int id);

        Task<IReadOnlyList<T>> GetByIdsAsync(IEnumerable<int> ids);

        Task<T> GetWithSpecsAsync(ISpecification<T> specification);
        
        void Add(T entity);

        void Update(T entity);

        void Delete(T entity);
    }
}