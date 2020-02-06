import { FaAngleDown } from "react-icons/fa/";
import PropTypes from "prop-types";
import React from "react";

const Expand = props => {
  const { onClick, theme } = props;

  return (
    <React.Fragment>
      <button className="more" to="#" onClick={onClick} aria-label="expand">
        <FaAngleDown size={30} />
      </button>

      {/* --- STYLES --- */}
      <style jsx>{`
        .more {
          cursor: pointer;
        }

        @below desktop {
          .more {
            background: ${theme.color.neutral.white};
            border: 1px solid ${theme.color.brand.primary};
            border-radius: ${theme.size.radius.small} ${theme.size.radius.small} 0 0;
            border-bottom: none;
            position: absolute;
            left: 50%;
            top: -35px;
            width: 60px;
            height: 36px;
            overflow: hidden;
            z-index: 1;
            transform: translateX(-50%);

            &:focus {
              outline: none;

              :global(svg) {
                fill: ${theme.color.brand.primary};
              }
            }

            :global(svg) {
              transition: all 0.5s;
              transform: rotateZ(180deg);
              fill: ${theme.color.special.attention};
            }

            :global(.open) & :global(svg) {
              transform: rotateZ(0deg);
            }
          }
        }

        @from-width desktop {
          .more {
            flex-shrink: 0;
            flex-grow: 0;
            width: 44px;
            height: 38px;
            background: transparent;
            margin-left: 10px;
            border-radius: ${theme.size.radius.small};
            border: 1px solid ${theme.line.color};
            display: flex;
            transition: background-color ${theme.time.duration.default};
            justify-content: center;
            align-items: center;
            padding: 0;
            z-index: 1;

            &:focus,
            &:hover {
              outline: none;
            }

            :global(svg) {
              transition: all ${theme.time.duration.default};
            }

            :global(.homepage) & {
              border: 1px solid transparent;
              background-color: color(white alpha(-90%));

              &:hover {
                background-color: color(white alpha(-60%));
              }
            }

            :global(.open) & {
              background-color: color(white alpha(-10%));
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;

              &:hover {
                background-color: color(white alpha(-10%));
              }

              :global(svg) {
                transform: rotate(180deg);
              }
            }

            :global(.fixed) & {
              border: 1px solid ${theme.line.color};
              height: 30px;
            }
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Expand.propTypes = {
  onClick: PropTypes.func,
  theme: PropTypes.object.isRequired
};

export default Expand;
