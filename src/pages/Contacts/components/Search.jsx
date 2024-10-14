import React, { useState, useEffect } from 'react';
import { InputAdornment, Stack, Box, Button, TextField } from '@mui/material';
import { CiSearch } from "react-icons/ci";

const Search = ({ onApplyFilters }) => {
    const [tempFilters, setTempFilters] = useState({ first_name: '', last_name: '' });
    const [isFiltered, setIsFiltered] = useState(false);

    useEffect(() => {
        if (tempFilters.first_name.length >= 5 || tempFilters.last_name.length >= 5) {
            handleApplyFilters();
        }
    }, [tempFilters.first_name, tempFilters.last_name]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleApplyFilters = () => {
        const hasFilters = tempFilters.first_name.length > 0 || tempFilters.last_name.length > 0;
        setIsFiltered(hasFilters);
        onApplyFilters(tempFilters);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && (tempFilters.first_name.length >= 4 || tempFilters.last_name.length >= 4)) {
            handleApplyFilters();
        }
    };

    const resetFilters = () => {
        setTempFilters({ first_name: '', last_name: '' });
        onApplyFilters({ first_name: '', last_name: '' });
        setIsFiltered(false);
    };

    return (
        <Stack
            spacing={2}
            alignItems="center"
            direction="row"
            sx={{ px: 2.5, py: 3 }}
            justifyContent="space-between" w
        >

            <Stack
                direction="row"
                spacing={2}
                sx={{ flexGrow: 1 }}
            >
                <TextField
                    name="first_name"
                    value={tempFilters.first_name}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="First Name"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <CiSearch />
                            </InputAdornment>
                        ),
                    }}
                    fullWidth
                    sx={{ width: { xs: '100%', md: '300px' } }}
                />

                <TextField
                    name="last_name"
                    value={tempFilters.last_name}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Last Name"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <CiSearch />
                            </InputAdornment>
                        ),
                    }}
                    fullWidth
                    sx={{ width: { xs: '100%', md: '300px' } }}
                />
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {isFiltered && (
                    <Button
                        color="error"
                        sx={{ mr: 2 }}
                        onClick={resetFilters}
                        variant="outlined"
                    >
                        Delete Filter
                    </Button>
                )}
                <Button
                    color="secondary"
                    sx={{ color: 'text.primary' }}
                    variant="outlined"
                    onClick={handleApplyFilters}
                >
                    Filter
                </Button>
            </Box>
        </Stack>
    );
};

export default Search;
