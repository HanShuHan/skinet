using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data.Repositories
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<int> CountAsync(ISpecification<T> specification);
        Task<IReadOnlyList<T>> ListAllAsync();
        Task<IReadOnlyList<T>> ListAsync(ISpecification<T> specification);
        Task<T> GetByIdAsync(int id);
        Task<T> GetEntityAsync(ISpecification<T> specification);
    }
}