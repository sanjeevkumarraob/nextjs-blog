'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface ViewsByCountryProps {
  data: {
    country: string | null
  }[]
}

export function ViewsByCountry({ data }: ViewsByCountryProps) {
  const viewsByCountry = data.reduce((acc, view) => {
    const country = view.country || 'Unknown'
    acc[country] = (acc[country] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const sortedCountries = Object.entries(viewsByCountry)
    .sort(([, a], [, b]) => b - a)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Country</TableHead>
          <TableHead className="text-right">Views</TableHead>
          <TableHead className="text-right">Percentage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedCountries.map(([country, views]) => (
          <TableRow key={country}>
            <TableCell>{country}</TableCell>
            <TableCell className="text-right">{views}</TableCell>
            <TableCell className="text-right">
              {((views / data.length) * 100).toFixed(1)}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
} 