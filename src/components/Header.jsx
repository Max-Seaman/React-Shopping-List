import Search from "./header-components/Search";
import SortBy from "./header-components/SortBy";

export function Header(
  { 
    // Props with default values for if they are not passed in
    searchQuery = "", setSearchQuery = () => {}, 
    sort = "", setSort = () => {} 
  }
) {
  return (
    <header className="w-full bg-blue-200 mb-4 flex justify-center">
      <div className="container mx-auto mb-4 flex flex-col justify-center w-full p-4">
        <h1 className="text-center text-5xl sm:text-6xl md:text-7xl pb-8 mt-4 font-semibold italic">
          Product Catalogue
        </h1>
        <div className="flex flex-col md:flex-row w-full gap-4 justify-between">
          <Search 
            value={searchQuery} 
            onSearch={setSearchQuery} 
          />
          <SortBy 
            value={sort} 
            onSortChange={setSort} 
          />
        </div>
      </div>
    </header>
  );
}
