using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Core.Entities
{
    [NotMapped]
    public class BaseEntity
    {
        [Key]
        public int Id { get; set; }
    }
}