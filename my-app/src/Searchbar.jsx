import React, { useState } from 'react';

/**
 * SearchBar component.
 * This component renders a search input field and a submit button.
 * It allows users to enter a search query and trigger a search action.
 */
const SearchBar = () => {
    // State to hold the current search query
    const [query, setQuery] = useState('');

    /**
     * Handles the search action.
     * Prevents the default form submission and logs the search query.
     *
     * @param {Event} e - The event object from the form submission
     */
    const handleSearch = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        // Implement your search logic here
        console.log('Search query:', query); // Log the search query for debugging
    };

    return (
        <form onSubmit={handleSearch} className="search-bar">
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)} // Update query state on input change
            />
            <button type="submit">Search</button> {/* Button to submit the search */}
        </form>
    );
};

export default SearchBar;
