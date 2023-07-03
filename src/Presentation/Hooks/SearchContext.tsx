import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface SearchContextProps {
	searchValue: string;
	setSearchValue: (searchValue: string) => void;
	handleSearch: () => void;
}

const defaultValue: SearchContextProps = {
	searchValue: '',
	setSearchValue: () => {},
	handleSearch: () => {},
};

export const SearchContext = createContext<SearchContextProps>(defaultValue);

export default function SearchProvider({ children }: any) {
	const [searchValue, setSearchValue] = useState<string>('');
	const navigate = useNavigate();

	const handleSearch = () => {
		searchValue && navigate(`/app/databases/filtre/search/${searchValue}`);
		setSearchValue('');
	};

	const value = {
		searchValue,
		setSearchValue,
		handleSearch,
	};

	return (
		<SearchContext.Provider value={value}>{children}</SearchContext.Provider>
	);
}
