import React from "react";
import { useNavigate } from "react-router-dom";
import "./UnpaidTable.css"
const UnpaidTable = ({ members }) => {
  const navigate = useNavigate();
  const unpaidMembers = members.filter((member) => !member.feeStatus);

  // Simple inline styles
  const styles = {
    container: {
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    },
    cardHeader: {
      background: '#f8f9fa',
      padding: '20px 25px',
      borderBottom: '1px solid #dee2e6'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    th: {
      background: '#2c3e50',
      color: 'white',
      padding: '12px 15px',
      border: '1px solid #dee2e6',
      textAlign: 'left',
      fontWeight: '600'
    },
    td: {
      padding: '12px 15px',
      border: '1px solid #dee2e6',
      textAlign: 'left'
    },
    evenRow: {
      background: '#f8f9fa'
    },
    viewBtn: {
      background: '#007bff',
      color: 'white',
      border: 'none',
      padding: '6px 12px',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    noData: {
      textAlign: 'center',
      padding: '40px 20px',
      color: '#6c757d'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.cardHeader}>
        <h3 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>
          Unpaid Members List
        </h3>
        <p style={{ margin: '0', color: '#6c757d' }}>
          Total {unpaidMembers.length} unpaid member{unpaidMembers.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div>
        {unpaidMembers.length === 0 ? (
          <div style={styles.noData}>
            <h4 style={{ color: '#495057', marginBottom: '10px' }}>All Clear!</h4>
            <p>All members have paid their fees.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>S.No.</th>
                  <th style={styles.th}>NAME</th>
                  <th style={styles.th}>EMAIL</th>
                  <th style={styles.th}>CONTACT</th>
                  <th style={styles.th}>MEMBERSHIP</th>
                  <th style={styles.th}>PLAN</th>
                  <th style={styles.th}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {unpaidMembers.map((member, index) => (
                  <tr key={member._id || index} style={index % 2 === 0 ? styles.evenRow : {}}>
                    <td style={styles.td}>{index + 1}</td>
                    <td style={styles.td}>{member.name || 'N/A'}</td>
                    <td style={styles.td}>{member.email || 'N/A'}</td>
                    <td style={styles.td}>{member.phone || member.number || 'N/A'}</td>
                    <td style={styles.td}>{member.membershipType || member.membership || 'N/A'}</td>
                    <td style={styles.td}>{member.plan || 'N/A'}</td>
                    <td style={styles.td}>
                      <button
                        style={styles.viewBtn}
                        onClick={() => navigate(`/members/${member._id}`)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnpaidTable;