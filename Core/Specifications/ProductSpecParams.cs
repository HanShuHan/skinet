namespace Core.Specifications
{
    public class ProductSpecParams
    {
        // Filtering params
        public int? BrandId { get; set; }
        public int? TypeId { get; set; }
        // Searching param
        public string Search { get; set; }
        // Sorting param
        public string Sort { get; set; }
        // Paging params
        public int PageIndex { get; set; } = 1;
        public const int MaxPageSize = 20;
        public int PageSize { get; set; } = MaxPageSize;
    }
}
