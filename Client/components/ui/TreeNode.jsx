import { useEffect } from "react";
import { useState } from "react";

import { ExternalLink } from "lucide-react";

function TreeNode({ data = {}, selectionLimit = Infinity, homepage = null, onSelectionChange = null }) {
  const [expanded, setExpanded] = useState({});
  const [selected, setSelected] = useState({});

  const toggleNode = (nodeId) => {
    setExpanded(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  // const handleNodeSelection = (nodeId, isSelected) => {
  //   setSelected(prev => ({
  //     ...prev,
  //     [nodeId]: !isSelected
  //   }));
  // };

  const getTotalSelectedCount = (currentSelection = selected) => {
    return Object.values(currentSelection).filter(Boolean).length;
  };

  const countSelectedInNode = (nodeId, node) => {
    let count = 1;
    if (node.children && Object.keys(node.children).length > 0) {
      Object.entries(node.children).forEach(([childId, childNode]) => {
        count += countSelectedInNode(childId, childNode);
      });
    }
    return count;
  };

  const handleSelectAll = (nodeId, node, isSelected) => {
    const newSelected = { ...selected };
    const toggleValue = !isSelected;
    
    if (toggleValue) {
      const nodeSelectionCount = countSelectedInNode(nodeId, node);
      const currentTotal = getTotalSelectedCount(newSelected);
      const newTotal = currentTotal + nodeSelectionCount;
      
      if (newTotal > selectionLimit) {
        alert(`Selection limit of ${selectionLimit} pages exceeded. Current: ${currentTotal}, Trying to add: ${nodeSelectionCount}`);
        return;
      }
    }
    
    newSelected[nodeId] = toggleValue;
    
    const selectAllChildren = (children) => {
      Object.entries(children).forEach(([childId, childNode]) => {
        newSelected[childId] = toggleValue;
        if (childNode.children && Object.keys(childNode.children).length > 0) {
          selectAllChildren(childNode.children);
        }
      });
    };
    
    if (node.children && Object.keys(node.children).length > 0) {
      selectAllChildren(node.children);
    }
    
    setSelected(newSelected);
  };

  const countSelectedInSubtree = (nodeId, node) => {
    let count = selected[nodeId] ? 1 : 0;
    
    if (node.children && Object.keys(node.children).length > 0) {
      Object.entries(node.children).forEach(([childId, childNode]) => {
        count += countSelectedInSubtree(childId, childNode);
      });
    }
    
    return count;
  };

  const countTotalInSubtree = (node) => {
    let count = 1;
    
    if (node.children && Object.keys(node.children).length > 0) {
      // eslint-disable-next-line no-unused-vars
      Object.entries(node.children).forEach(([_, childNode]) => {
        count += countTotalInSubtree(childNode);
      });
    }
    
    return count;
  };

  const formatNodeName = (name) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Helper function to find URL by node ID
  const findNodeUrlById = (nodeId, searchData = data) => {
    for (const [key, node] of Object.entries(searchData)) {
      if (key === nodeId) {
        return node.url;
      }
      if (node.children && Object.keys(node.children).length > 0) {
        const foundUrl = findNodeUrlById(nodeId, node.children);
        if (foundUrl) return foundUrl;
      }
    }
    return null;
  };

  const renderNode = (nodeId, node, level = 0) => {
    const isExpanded = expanded[nodeId] || false;
    const isSelected = selected[nodeId] || false;
    const hasChildren = node.children && Object.keys(node.children).length > 0;
    const selectedCount = countSelectedInSubtree(nodeId, node);
    const totalCount = countTotalInSubtree(node);
    const isParent = hasChildren;

    const paddingClass = level === 0 ? 'ml-0' : `ml-${Math.min(level * 4, 12)}`;

    // Parent node styles
    const parentBg = "bg-gray-100";
    const parentBorder = "border-gray-300";
    const parentHover = "hover:bg-gray-200";
    const parentIconBg = "hover:bg-gray-300";

    // Child node styles
    const childBg = "bg-gray-50";
    const childBorder = "border-gray-200";
    const childHover = "hover:bg-gray-100";
    const childIconBg = "hover:bg-gray-300";

    const bgClass = isParent ? parentBg : childBg;
    const borderClass = isParent ? parentBorder : childBorder;
    const hoverClass = isParent ? parentHover : childHover;
    const iconBgClass = isParent ? parentIconBg : childIconBg;

    return (
      <div key={nodeId} className={`${paddingClass} space-y-1`}>
        <div className={`border ${borderClass} rounded-lg overflow-hidden`}>
          <div className={`flex items-center ${bgClass} ${hoverClass} px-3 py-2 transition-all duration-200 ${isParent ? 'border-l-4 border-l-gray-800' : ''}`}>
            {hasChildren && (
              <button
                onClick={() => toggleNode(nodeId)}
                className={`w-6 h-6 flex items-center justify-center ${iconBgClass} rounded text-gray-700 font-bold text-sm transition-colors`}
              >
                {isExpanded ? "−" : "+"}
              </button>
            )}
            {!hasChildren && <div className="w-6" />}

            <input
              type="checkbox"
              className={`ml-3 w-4 h-4 ${getTotalSelectedCount() >= selectionLimit && !isSelected ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              checked={isSelected}
              disabled={getTotalSelectedCount() >= selectionLimit && !isSelected}
              onChange={() => handleSelectAll(nodeId, node, isSelected)}
              title={getTotalSelectedCount() >= selectionLimit && !isSelected ? `Selection limit of ${selectionLimit} reached` : ''}
            />

            <span className={`ml-3 ${isParent ? 'font-bold text-base text-gray-900' : 'font-semibold text-sm text-gray-800'} ${isSelected ? 'text-gray-900' : ''}`}>
              {formatNodeName(node.name)}
              {/* {console.log("🔴 Rendering node:", node.name, node)} */}
              {node.url && (
                <a
                  href={node.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block ml-1 text-gray-500 hover:text-gray-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </span>

            {hasChildren && (
              <span className={`ml-auto text-xs font-semibold ${isParent ? 'text-gray-700' : 'text-gray-600'}`}>
                {selectedCount}/{totalCount - 1}
              </span>
            )}
            {!hasChildren && isSelected && (
              <span className="ml-auto text-xs font-semibold text-green-600">✓ Selected</span>
            )}
          </div>

          {isExpanded && hasChildren && (
            <div className="bg-white border-t border-gray-200 max-h-96 overflow-y-auto">
              {Object.entries(node.children).map(([childId, childNode]) =>
                renderNode(childId, childNode, level + 1)
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    // Notify parent component of selection changes
    if (onSelectionChange) {
      // Convert selected object to array of selected page URLs
      const selectedPages = Object.entries(selected)
        .filter(([, isSelected]) => isSelected)
        .map(([nodeId, ]) => {
          if (nodeId === 'homepage') {
            return homepage;
          }
          return findNodeUrlById(nodeId);
        })
        .filter(url => url !== null);
      onSelectionChange(selectedPages);
    }
  }, [selected, data, homepage, onSelectionChange]);

  return (
    <div className="space-y-2">
      {/* Homepage Node */}
      {homepage && (
        <div className="mb-4">
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="flex items-center bg-gray-100 hover:bg-gray-200 px-3 py-3 transition-all duration-200 border-l-4 border-l-gray-700">
              <svg className="w-5 h-5 text-gray-700 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              <input
                type="checkbox"
                className={`ml-2 w-4 h-4 ${getTotalSelectedCount() >= selectionLimit && !selected['homepage'] ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                checked={selected['homepage'] || false}
                disabled={getTotalSelectedCount() >= selectionLimit && !selected['homepage']}
                onChange={() => {
                  const isCurrentlySelected = selected['homepage'] || false;
                  if (!isCurrentlySelected && getTotalSelectedCount() >= selectionLimit) {
                    alert(`Selection limit of ${selectionLimit} pages exceeded. Current: ${getTotalSelectedCount()}, Trying to add: 1`);
                    return;
                  }
                  setSelected(prev => ({
                    ...prev,
                    'homepage': !isCurrentlySelected
                  }));
                }}
                title={getTotalSelectedCount() >= selectionLimit && !selected['homepage'] ? `Selection limit of ${selectionLimit} reached` : ''}
              />
              <span className="ml-3 font-bold text-base text-gray-900">Homepage</span>
              <span className="ml-auto text-xs font-semibold text-gray-600 break-all text-right max-w-xs">{homepage}</span>
              {selected['homepage'] && (
                <span className="ml-2 text-sm font-semibold text-gray-900">✓</span>
              )}
            </div>
          </div>
        </div>
      )}
      {Object.entries(data).map(([nodeId, node]) =>
        renderNode(nodeId, node, 0)
      )}
    </div>
  );
}

export default TreeNode;
