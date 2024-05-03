using System.Collections;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories;

public class UnitOfWork<TDbContext> : IUnitOfWork<TDbContext> where TDbContext : DbContext
{
    private readonly TDbContext _dbContext;
    private readonly Hashtable _repositories = [];

    public UnitOfWork(TDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
    {
        var entityType = typeof(TEntity);
        var repoType = typeof(GenericRepository<>);

        if (_repositories[entityType.Name] == null)
        {
            var repo = Activator.CreateInstance(repoType.MakeGenericType(entityType), _dbContext);
            _repositories.Add(entityType.Name, repo);
        }

        return (IGenericRepository<TEntity>)_repositories[entityType.Name];
    }

    public async Task<int> Complete()
    {
        return await _dbContext.SaveChangesAsync();
    }

    public void Dispose()
    {
        _dbContext.Dispose();
    }
}