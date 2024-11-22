
import React from "react";
import './index.css';

/*
* Global Footer Component
*
* */

export default function GlobalFooter() {
  const currentYear = new  Date().getFullYear();
  return (
    <div className="global-footer">
      <div>© {currentYear} XMIIPP </div>
      <div>by Panda Man - 熊猫人</div>
    </div>
  );
}