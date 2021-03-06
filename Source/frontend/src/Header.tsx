import React, { ChangeEvent, useState, FormEvent } from "react";
import {UserIcon} from "./UserIcon";
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { fontFamily, fontSize, gray1, gray2, gray5 } from './Styles';
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

import { useAuth } from './Auth';

const buttonStyle = css`
  border: none;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  padding: 5px 10px;
  background-color: transparent;
  color: ${gray2};
  text-decoration: none;
  cursor: pointer;
  span {
    margin-left: 10px;
  }
  :focus {
    outline-color: ${gray5};
  }
`;

export const Header: React.FC<RouteComponentProps>  = (props) => {

    const searchParams = new URLSearchParams(props.location.search);
    const criteria = searchParams.get('criteria') || '';

    const [search, setSearch] = useState(criteria);

    const { isAuthenticated, user, loading } = useAuth();

    const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearch(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        props.history.push(`/search?criteria=${search}`)
    }

    return (<div
        css={css`
        position: fixed;
        box-sizing: border-box;
        top: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        background-color: #fff;
        border-bottom: 1px solid ${gray5};
        box-shadow: 0 3px 7px 0 rgba(110, 112, 114, 0.21);
        `}>
          <div>
            <Link to="/" 
                  css={css`
                  font-size: 24px;
                  font-weight: bold;
                  color: ${gray1};
                  text-decoration: none;
              `}>
                  Q & A
            </Link>
            
            <span
              css={css`
              margin-left: 10px;
              font-size: 16px;
              color: ${gray2};
              `}
            >
              {process.env.REACT_APP_ENV || 'development'}
            </span>
          </div>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search..."
                        css={css`
                        box-sizing: border-box;
                        font-family: ${fontFamily};
                        font-size: ${fontSize};
                        padding: 8px 10px;
                        border: 1px solid ${gray5};
                        border-radius: 3px;
                        color: ${gray2};
                        background-color: white;
                        width: 200px;
                        height: 30px;
                        :focus {
                            outline-color: ${gray5};
                        }
                `}
                    onChange={handleSearchInputChange}
                    value={search}
                />
            </form>
        {!loading &&
        (isAuthenticated ? (
          <div>
            <span>{user!.name}</span>
            <Link
              to={{ pathname: '/signout', state: { local: true } }}
              css={buttonStyle}
            >
              <UserIcon />
              <span>Sign Out</span>
            </Link>
          </div>
        ) : (
          <Link to="/signin" css={buttonStyle}>
            <UserIcon />
            <span>Sign In</span>
          </Link>
        ))}
    </div>)
};

export const HeaderWithRouter = withRouter(Header);