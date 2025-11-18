import React from 'react';

const AllActiveOaths = () => {
  return (
    <section>
      <div className="mb-4">
        <h3 className="text-xl font-bold leading-tight tracking-tight text-white">All Active Oaths</h3>
        <p className="text-sm text-white/60">Everything you’re committed to right now.</p>
      </div>
      <div className="overflow-hidden rounded border border-surface bg-surface">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-white/10 text-xs uppercase text-white/60">
              <tr>
                <th className="px-4 py-3 font-medium">Oath Name</th>
                <th className="px-4 py-3 font-medium">Opponent</th>
                <th className="px-4 py-3 font-medium">Stake</th>
                <th className="px-4 py-3 font-medium">Next Deadline</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="text-white/90">
              <tr className="border-b border-white/10">
                <td className="px-4 py-3 font-medium">No sugar after 8pm</td>
                <td className="px-4 py-3">Marcus</td>
                <td className="px-4 py-3 font-bold text-primary">$75</td>
                <td className="px-4 py-3">Nov 19, 2024</td>
                <td className="px-4 py-3 text-right">
                  <a className="font-medium text-primary/80 hover:text-primary" href="#">
                    Open
                  </a>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Code for 1 hour</td>
                <td className="px-4 py-3">Alex</td>
                <td className="px-4 py-3 font-bold text-primary">$25</td>
                <td className="px-4 py-3">Nov 20, 2024</td>
                <td className="px-4 py-3 text-right">
                  <a className="font-medium text-primary/80 hover:text-primary" href="#">
                    Open
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AllActiveOaths;
