import {useRouter} from "next/navigation";
import { Input } from "antd";
/**
 * 搜索条
 * @constructor
 */
const SearchInput = () => {
  const router = useRouter();

  return (
      <div
          className="search-input"
          key="SearchOutlined"
          aria-hidden
          style={{
            display: "flex",
            alignItems: "center",
            marginInlineEnd: 24,
          }}
      >
        <Input.Search
            style={{
              borderRadius: 4,
              marginInlineEnd: 12,
            }}
            placeholder="Search"
            onSearch={(value) => {
              router.push(`/questions?q=${value}`);
            }}
        />
      </div>
  );
};


export default SearchInput;