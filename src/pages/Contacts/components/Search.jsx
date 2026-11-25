import React, { useState, useEffect } from 'react';
import { InputAdornment, Stack, Box, Button, TextField } from '@mui/material';
import { CiSearch } from "react-icons/ci";

const Search = ({ onApplyFilters }) => {
    const [tempFilters, setTempFilters] = useState({ first_name: '', last_name: '' });
    const [isFiltered, setIsFiltered] = useState(false);

    useEffect(() => {
        if (tempFilters.first_name.length >= 5 || tempFilters.last_name.length >= 5) {
            setIsFiltered(true);
            onApplyFilters(tempFilters);
        }
    }, [tempFilters, onApplyFilters]);

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
            direction={{ xs: 'column', sm: 'row' }}
            sx={{ p: { xs: 2, sm: 3 }, alignItems: { xs: 'stretch', sm: 'center' } }}
            justifyContent="space-between"
        >

            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ flexGrow: 1, width: '100%' }}
            >
                <TextField
                    label="First name"
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
                    sx={{ maxWidth: { sm: 280 }, bgcolor: '#fff' }}
                />

                <TextField
                    label="Last name"
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
                    sx={{ maxWidth: { sm: 280 }, bgcolor: '#fff' }}
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
                        Clear
                    </Button>
                )}
                <Button
                    sx={{ textTransform: 'none', px: 3, borderRadius: 2, fontWeight: 600 }}
                    variant="contained"
                    onClick={handleApplyFilters}
                >
                    Search
                </Button>
            </Box>
        </Stack>
    );
};

export default Search;
