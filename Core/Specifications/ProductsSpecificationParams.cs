namespace Core.Specifications
{
    public class ProductsSpecificationParams
    {
        public static readonly int DefaultPageIndex = 1;
        public static readonly int DefaultMaxPageSize = 20;

        // Filtering params
        public int BrandId { get; set; }
        public int TypeId { get; set; }

        // Searching param
        public string Search { get; set; }

        // Sorting param
        public string Sort { get; set; }

        // Paging params
        private int _pageSize;

        public int PageSize
        {
            get => _pageSize;
            set
            {
                if (value > DefaultMaxPageSize || value < 1)
                {
                    _pageSize = DefaultMaxPageSize;
                }
                else
                {
                    _pageSize = value;
                }
            }
        }

        private int _pageIndex;
        public int PageIndex
        {
            get => _pageIndex;
            set => _pageIndex = (value < DefaultPageIndex) ? DefaultPageIndex : value;
        }
    }
}