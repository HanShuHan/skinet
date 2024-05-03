using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Core.Interfaces;

public interface IUnitOfWork<TDbContext> : IDisposable where TDbContext : DbContext
{
    IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity;
    Task<int> Complete();
}