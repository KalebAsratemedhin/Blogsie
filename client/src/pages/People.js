import { 
  List,
  Typography, 
  ListItemButton, 
  ListItemAvatar, 
  ListItemText, 
  Avatar, 
  TextField, 
  Autocomplete, 
  Stack, 
  Box, 
  styled, 
  InputBase, 
  alpha,
  IconButton
} from '@mui/material'
import React, { useContext, useState } from 'react'
import { SearchRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../contexts/SearchContext';
