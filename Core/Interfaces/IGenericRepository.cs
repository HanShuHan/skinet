using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data.Repositories
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<IReadOnlyList<T>> ListAllAsync();
        Task<IReadOnlyList<T>> ListWithSpecAsync(ISpecification<T> specification);
        Task<T> GetByIdAsync(int id);
        Task<T> GetEntityWithSpecAsync(ISpecification<T> specification);
    }
}